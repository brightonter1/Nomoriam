pragma solidity >=0.4.21 <0.7.0;


contract Nomoriam {
    struct Activity {
        string title;
        string image;
        string category;
        uint256 times;
        uint256 exp;
        uint256 point;
        mapping(uint256 => bytes32) qrcode;
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
        uint256[] activities;
        mapping(uint256 => Activity) activity;
        string[] players;
        mapping(string => Player) player;
        uint256 sum_point;
        mapping(string => bool) joined;
        uint256[] medals;
        mapping(uint256 => Medal) medal;
        uint256 countLeader;
        mapping(uint256 => string) leaders;
    }

    struct Medal {
        string title;
        string image;
        string create_time;
    }

    struct Player {
        string uid;
        uint256 point;
        uint256 exp;
        uint256[] challenges;
        uint256[] medals;
        mapping(uint256 => Medal) medal;
        mapping(uint256 => Challenge) challenge;
    }

    mapping(uint256 => string) owner;
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

    function compareString(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    /* 
        Challenge
    */

    function createChallenge(
        string memory title,
        string memory desc,
        string memory image,
        string memory create_time,
        string memory end_time,
        string memory _owner
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

    uint256[] points;

    function finishChallenge(uint256 index) public {
        require(challenges[index].approved, "Check Approve");
        require(!challenges[index].finished, "Check Finished");
        challenges[index].finished = true;

        uint256[] memory temp;
        points = temp;

        for (uint256 i = 0; i < challenges[index].players.length - 1; i++) {
            if (
                (challenges[index].player[challenges[index].players[i]].point ==
                    challenges[index].sum_point)
            ) {
                player[challenges[index].players[i]].point += 200;
                player[challenges[index].players[i]]
                    .medal[player[challenges[index].players[i]]
                    .medals
                    .length] = challenges[index].medal[3];
            }
        }
    }

    function joinChallenge(uint256 index, string memory uid)
        public
        returns (string memory, uint256, uint256, string memory, uint256)
    {
        require(!challenges[index].joined[uid], "");
        // Challenge
        challenges[index].player[uid].uid = uid;
        challenges[index].player[uid].point = 0;
        challenges[index].player[uid].exp = 0;
        challenges[index].players.push(uid);

        // Player
        player[uid].challenge[getChallengeCountByPlayer(
            uid
        )] = challenges[index];

        for (uint256 i = 0; i < getActivityCount(index); i++) {
            player[uid].challenge[index].activity[i].title = challenges[index]
                .activity[i]
                .title;
            player[uid].challenge[index].activity[i].image = challenges[index]
                .activity[i]
                .image;
            player[uid].challenge[index].activity[i]
                .category = challenges[index].activity[i].category;
            player[uid].challenge[index].activity[i].times = challenges[index]
                .activity[i]
                .times;
            player[uid].challenge[index].activity[i].point = challenges[index]
                .activity[i]
                .point;
            player[uid].challenge[index].activity[i].exp = challenges[index]
                .activity[i]
                .exp;
            if (
                compareString(challenges[index].activity[i].category, "qrcode")
            ) {
                for (
                    uint256 j = 0;
                    j < challenges[index].activity[i].times;
                    j++
                ) {
                    player[uid].challenge[index].activity[i]
                        .qrcode[j] = generateQRcode(
                        challenges[index].activity[i].title,
                        challenges[index].activity[i].category,
                        j
                    );
                }
            }
            player[uid].challenge[getChallengeCountByPlayer(uid)]
                .activities
                .push(getChallengeCountByPlayer(uid));
        }
        player[uid].challenges.push(getChallengeCountByPlayer(uid));
        challenges[index].joined[uid] = true;
    }

    function addActivity(
        uint256 _index,
        string memory title,
        string memory image,
        string memory category,
        uint256 times
    ) public restricted {
        challenges[_index].activity[getActivityCount(_index)].title = title;
        challenges[_index].activity[getActivityCount(_index)].image = image;
        challenges[_index].activity[getActivityCount(_index)]
            .category = category;
        challenges[_index].activity[getActivityCount(_index)].times = times;
        challenges[_index].activity[getActivityCount(_index)]
            .point = generatePoint(category);
        challenges[_index].activity[getActivityCount(_index)].exp = generateExp(
            category
        );
        challenges[_index].sum_point += generatePoint(category) * times;
        // if (compareString(category, "qrcode")) {
        for (uint256 i = 0; i < times; i++) {
            challenges[_index].activity[getActivityCount(_index)]
                .qrcode[i] = generateQRcode(title, category, i + 1);
        }
        // }
        challenges[_index].activities.push(getActivityCount(_index));
    }

    function generateQRcode(string memory word, string memory word2, uint256 _i)
        internal
        pure
        returns (bytes32)
    {
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

    function doPost(uint256 _index, uint256 _count, string memory uid)
        public
        returns (uint256)
    {
        require(player[uid].challenge[_index].activity[_count].times > 0, "");

        // Add Exp to Player
        player[uid].challenge[_index].activity[_count].times--;
        player[uid].exp += challenges[_index].activity[_count].exp;
        // Add Point to Challenge
        challenges[_index].player[uid].point += challenges[_index]
            .activity[_count]
            .point;
        player[uid].point += challenges[_index].activity[_count].point;

        if (
            challenges[_index].player[uid].point == challenges[_index].sum_point
        ) {
            if (challenges[_index].countLeader < 3) {
                player[uid].medal[player[uid]
                    .medals
                    .length] = challenges[_index].medal[challenges[_index]
                    .countLeader];
                player[uid].medals.push(player[uid].medals.length);
                challenges[_index].countLeader++;
                return challenges[_index].countLeader;
            }
        }

        return 0;
    }

    function doQRCode(
        uint256 _index,
        uint256 _count,
        string memory uid,
        bytes32 qrcode
    ) public returns (uint256) {
        require(player[uid].challenge[_index].activity[_count].times > 0, "");
        bool isExist = false;
        for (
            uint256 i = 0;
            i < challenges[_index].activity[_count].times;
            i++
        ) {
            if (
                challenges[_index].activity[_count].qrcode[i] == qrcode &&
                !player[uid].challenge[_index].activity[_count]
                    .qrcodeComplete[qrcode]
            ) {
                player[uid].challenge[_index].activity[_count]
                    .qrcodeComplete[qrcode] = true;
                // add exp to player
                player[uid].challenge[_index].activity[_count].times--;
                player[uid].exp += challenges[_index].activity[_count].exp;
                // add Point to challenge
                isExist = true;
                challenges[_index].player[uid].point += challenges[_index]
                    .activity[_count]
                    .point;
                player[uid].point += challenges[_index].activity[_count].point;
            }
        }
        if (isExist) {
            if (
                challenges[_index].player[uid].point ==
                challenges[_index].sum_point
            ) {
                if (challenges[_index].countLeader < 3) {
                    player[uid].medal[player[uid]
                        .medals
                        .length] = challenges[_index].medal[challenges[_index]
                        .countLeader];
                    player[uid].medals.push(player[uid].medals.length);
                    challenges[_index].countLeader++;
                    return challenges[_index].countLeader;
                }
            } else {
                return 5;
            }
        } else {
            return 0;
        }
    }

    function generatePoint(string memory category)
        internal
        pure
        returns (uint256)
    {
        return
            compareString(category, "qrcode")
                ? 200
                : compareString(category, "question")
                ? 50
                : 100;
    }

    function generateExp(string memory category)
        internal
        pure
        returns (uint256)
    {
        return
            compareString(category, "qrcode")
                ? 150
                : compareString(category, "question")
                ? 50
                : 100;
    }

    /*
        Player
    */

    function createPlayer(string memory uid) public returns (bool) {
        player[uid].uid = uid;
        player[uid].point = 0;
        player[uid].exp = 0;
        players.push(uid);
    }

    /*
    
        Medal
    
    */

    function addMedal(
        uint256 _index,
        string memory _title,
        string memory _image
    ) public {
        challenges[_index].medal[getMedalByChallenge(_index)] = Medal({
            title: _title,
            image: _image,
            create_time: challenges[_index].end_time
        });
        challenges[_index].medals.push(getMedalByChallenge(_index));
    }

    /* get Data from contract */

    function getMedalByChallenge(uint256 _index) public view returns (uint256) {
        return challenges[_index].medals.length;
    }

    function getMedalByIndex(uint256 _index, uint256 _count)
        public
        view
        returns (string memory, string memory, string memory)
    {
        return (
            challenges[_index].medal[_count].title,
            challenges[_index].medal[_count].image,
            challenges[_index].medal[_count].create_time
        );
    }

    function getActivityCount(uint256 _index) public view returns (uint256) {
        return challenges[_index].activities.length;
    }

    function getChallengeCountByPlayer(string memory uid)
        public
        view
        returns (uint256)
    {
        return player[uid].challenges.length;
    }

    function getChallengeCount() public view returns (uint256) {
        return challenges.length;
    }

    function getPlayer(string memory uid)
        public
        view
        returns (string memory, uint256, uint256, uint256)
    {
        return (
            player[uid].uid,
            player[uid].point,
            player[uid].exp,
            player[uid].challenges.length
        );
    }

    function getMedalCountByPlayer(string memory uid)
        public
        view
        returns (uint256)
    {
        return player[uid].medals.length;
    }

    function getMedalByPlayer(string memory uid, uint256 _count)
        public
        view
        returns (string memory, string memory, string memory)
    {
        return (
            player[uid].medal[_count].title,
            player[uid].medal[_count].image,
            player[uid].medal[_count].create_time
        );
    }

    function getActivityChallengeByPlayer(
        uint256 index,
        uint256 count,
        string memory uid
    ) public view returns (string memory, uint256) {
        return (
            player[uid].challenge[index].activity[count].title,
            player[uid].challenge[index].activity[count].times
        );
    }

    function getJoinedChallenge(uint256 index, string memory uid)
        public
        view
        returns (bool)
    {
        return challenges[index].joined[uid];
    }

    function getPlayerCountByChallenge(uint256 index)
        public
        view
        returns (uint256)
    {
        return challenges[index].players.length;
    }

    function getPlayerUID(uint256 index, uint256 count)
        public
        view
        returns (string memory)
    {
        return challenges[index].players[count];
    }

    function getPlayerByChallenge(uint256 index, string memory uid)
        public
        view
        returns (string memory, uint256)
    {
        return (
            challenges[index].player[uid].uid,
            challenges[index].player[uid].point
        );
    }

    // function getQuestionByChallenge(uint _index, uint _count) public view returns(string memory, string memory){
    //     return (challenges[_index].activity[_count].question, challenges[_index].activity[_count].answer);
    // }

    function getQRcodeByChallenge(
        uint256 _index,
        uint256 _count,
        uint256 _times
    ) public view returns (bytes32) {
        return challenges[_index].activity[_count].qrcode[_times];
    }

    function getActivityByChallenge(uint256 _index, uint256 _count)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            challenges[_index].activity[_count].title,
            challenges[_index].activity[_count].image,
            challenges[_index].activity[_count].category,
            challenges[_index].activity[_count].times,
            challenges[_index].activity[_count].point,
            challenges[_index].activity[_count].exp
        );
    }

    function getOwnerByChallenge(uint256 index)
        public
        view
        returns (string memory)
    {
        return owner[index];
    }
}
