pragma solidity >=0.4.21 <0.7.0;



contract Nomoriam {
    
    struct Activity {
        string title;
        string image;
        string category;
        uint times;
        uint exp;
        uint point;
        string question;
        string answer;
        string location;
        mapping(uint => bytes32) qrcode;
        mapping(bytes32 => bool) qrcodeComplete;
    }
    
    struct Challenge {
        string title;
        string desc;
        string image;
        string create_time;
        string end_time;
        bool finished;
        bool approved;
        uint[] activities;
        mapping(uint => Activity) activity;
        string[] players;
        mapping(string => Player) player;
        uint sum_point;
        mapping(string => bool) joined;
    }
    
    struct Player {
        string uid;
        uint point;
        uint exp;
        uint[] challenges;
        mapping(uint => Challenge) challenge;
    }
    
    mapping(uint => string) owner;
    string[] public players;
    mapping(string => Player) player;
    
    Challenge[] public challenges;
    
    address public manager;
    
    constructor() public {
        manager = msg.sender;
    }
    
    modifier restricted() {
        require(msg.sender == manager, "");
        _;
    }
    
    function compareString(string memory a, string memory b) internal pure returns(bool){
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
    
    /* 
        Challenge
    */
    
    function createChallenge(
        string memory title, string memory desc, string memory image, string memory create_time, string memory end_time, string memory _owner
    ) public restricted {
        Challenge memory newChallenge;
        newChallenge.title = title;
        newChallenge.desc = desc;
        newChallenge.image = image;
        newChallenge.create_time = create_time;
        newChallenge.end_time = end_time;
        newChallenge.approved = true;
        owner[getChallengeCount()] = _owner;
        challenges.push(newChallenge);
    }
    
    function finishChallenge(uint index) public returns(bool){
        require(challenges[index].approved, "Check Approve");
        require(!challenges[index].finished, "Check Finished");
        challenges[index].finished = true;
        for (uint i = 0 ; i < challenges[index].players.length ; i++){
            if((challenges[index].player[challenges[index].players[i]].point == challenges[index].sum_point)){
                player[challenges[index].players[i]].point += 200;
            }
        }
        return true;
        
    }
    
    function joinChallenge(uint index, string memory uid) public returns(string memory, uint, uint,string memory,uint) {
        require(!challenges[index].joined[uid], "");
        // Challenge
        challenges[index].player[uid].uid = uid;
        challenges[index].player[uid].point = 0;
        challenges[index].player[uid].exp = 0;
        challenges[index].players.push(uid);
        
        // Player
        player[uid].challenge[getChallengeCountByPlayer(uid)] = challenges[index];
        
        for (uint i = 0 ; i < getActivityCount(index) ; i++){
            player[uid].challenge[index].activity[i].title = challenges[index].activity[i].title;
            player[uid].challenge[index].activity[i].image = challenges[index].activity[i].image;
            player[uid].challenge[index].activity[i].category = challenges[index].activity[i].category;
            player[uid].challenge[index].activity[i].times = challenges[index].activity[i].times;
            player[uid].challenge[index].activity[i].question = challenges[index].activity[i].question;
            player[uid].challenge[index].activity[i].answer = challenges[index].activity[i].answer;
            player[uid].challenge[index].activity[i].location = challenges[index].activity[i].location;
            player[uid].challenge[index].activity[i].point = challenges[index].activity[i].point;
            player[uid].challenge[index].activity[i].exp = challenges[index].activity[i].exp;
            if (compareString(challenges[index].activity[i].category, "qrcode")){
                for (uint j = 0 ; j < challenges[index].activity[i].times ; j++){
                    player[uid].challenge[index].activity[i].qrcode[j] = generateQRcode(
                        challenges[index].activity[i].title, challenges[index].activity[i].category, j
                    );
                }
            }
            player[uid].challenge[getChallengeCountByPlayer(uid)].activities.push(getChallengeCountByPlayer(uid));
        }
        player[uid].challenges.push(getChallengeCountByPlayer(uid));
        challenges[index].joined[uid] = true;
    }

    function addActivity (
        uint _index, string memory title, string memory image, string memory category, uint times,
        string memory question, string memory answer, string memory location
    ) public restricted {
        challenges[_index].activity[getActivityCount(_index)].title = title;
        challenges[_index].activity[getActivityCount(_index)].image = image;
        challenges[_index].activity[getActivityCount(_index)].category = category;
        challenges[_index].activity[getActivityCount(_index)].times = times;
        challenges[_index].activity[getActivityCount(_index)].question = question;
        challenges[_index].activity[getActivityCount(_index)].answer = answer;
        challenges[_index].activity[getActivityCount(_index)].location = location;
        challenges[_index].activity[getActivityCount(_index)].point = generatePoint(category);
        challenges[_index].activity[getActivityCount(_index)].exp = generateExp(category);
        challenges[_index].sum_point += generatePoint(category) * times;
        if (compareString(category, "qrcode")){
            for (uint i = 0 ; i < times ; i++){
                challenges[_index].activity[getActivityCount(_index)].qrcode[i] = generateQRcode(title, category, i);
            }
        }
        challenges[_index].activities.push(getActivityCount(_index));
    }
    
    function generateQRcode(string memory word, string memory word2, uint256 _i) internal pure returns (bytes32){
        if (_i == 0) {
            _i = 440;
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len - 1;
        while (_i != 0) {
            bstr[k--] = bytes1(uint8(48 + (_i % 10)));
            _i /= 10;
        }
        string memory concat = string(
            abi.encodePacked(word, word2, string(bstr))
        );
        bytes32 hash = keccak256(abi.encodePacked(concat));
        return hash;
    }
    
    function doPost(uint _index, uint _count, string memory uid) public returns(bool){
        require(player[uid].challenge[_index].activity[_count].times > 0, "");
        
        // Add Exp to Player
        player[uid].challenge[_index].activity[_count].times--;
        player[uid].exp += challenges[_index].activity[_count].exp;
        // Add Point to Challenge
        challenges[_index].player[uid].point += challenges[_index].activity[_count].point;
        return true;
    }
    
    function doQuestion(uint _index, uint _count, string memory uid, string memory answer) public returns(bool){
        require(compareString(answer, challenges[_index].activity[_count].answer),"");
        require(player[uid].challenge[_index].activity[_count].times == 1, "");
        
        // add Exp to player
        player[uid].challenge[_index].activity[_count].times--;
        player[uid].exp += challenges[_index].activity[_count].exp;
        // add Point to challenge
        challenges[_index].player[uid].point += challenges[_index].activity[_count].point;
    }
    
    function doQRCode(uint _index, uint _count, string memory uid, bytes32 qrcode) public returns(bool){
        require(player[uid].challenge[_index].activity[_count].times > 0, "");
        for (uint i = 0 ; i < challenges[_index].activity[_count].times ; i++){
            if(challenges[_index].activity[_count].qrcode[i] == qrcode && !player[uid].challenge[_index].activity[_count].qrcodeComplete[qrcode]){
                player[uid].challenge[_index].activity[_count].qrcodeComplete[qrcode] = true;
                // add exp to player
                player[uid].challenge[_index].activity[_count].times--;
                player[uid].exp += challenges[_index].activity[_count].exp;
                 // add Point to challenge
                challenges[_index].player[uid].point += challenges[_index].activity[_count].point;
                return true;
            }
        }
        return false;
    }

    
    function generatePoint(string memory category) internal pure returns(uint){
        return compareString(category,"qrcode") ? 200 : compareString(category, "question") ? 50 : 100;
    }
    
    function generateExp(string memory category) internal pure returns(uint){
        return compareString(category,"qrcode") ? 150 : compareString(category, "question") ? 50 : 100;
    }
    
    /* 
        Player
    */
    
    function createPlayer(string memory uid) public returns(bool){
        player[uid].uid = uid;
        player[uid].point = 0;
        player[uid].exp = 0;
        players.push(uid);
    }
    
    function getActivityCount(uint _index) public view returns(uint){
        return challenges[_index].activities.length;
    }
    
    function getPlayerCount() public view returns(uint){
        return players.length;
    }
    
    function getChallengeCountByPlayer(string memory uid) public view returns(uint){
        return player[uid].challenges.length;
    }
    
    function getChallengeCount() public view returns(uint){
        return challenges.length;
    } 
    
    function getPlayer(string memory uid) public view returns(string memory, uint, uint, uint){
        return (
            player[uid].uid, player[uid].point, player[uid].exp, player[uid].challenges.length
        );
    }
    
    function getActivityChallengeByPlayer(uint index, uint count, string memory uid) public view returns(
        string memory, uint){
        return (
            player[uid].challenge[index].activity[count].title, player[uid].challenge[index].activity[count].times 
        );
    }
    
    function getJoinedChallenge(uint index, string memory uid) public view returns(bool){
        return challenges[index].joined[uid];
    }
    
    function getStatusChallenge(uint index) public view returns(
        bool, bool, uint
    ){
        return (
             challenges[index].approved, challenges[index].finished, challenges[index].sum_point    
        );
    }

    
    function getQuestionByChallenge(uint _index, uint _count) public view returns(string memory, string memory){
        return (challenges[_index].activity[_count].question, challenges[_index].activity[_count].answer);
    }
    
    function getQRcodeByChallenge(uint _index, uint _count, uint _times) public view returns (bytes32) {
        return challenges[_index].activity[_count].qrcode[_times];
    }
    
    function getActivityByChallenge(uint _index, uint _count) public view returns(
        string memory, string memory, string memory, uint, uint, uint, string memory 
    ){
        return (
            challenges[_index].activity[_count].title, challenges[_index].activity[_count].image, challenges[_index].activity[_count].category,
            challenges[_index].activity[_count].times, challenges[_index].activity[_count].point, challenges[_index].activity[_count].exp,
            challenges[_index].activity[_count].location
        );
    }
    

}