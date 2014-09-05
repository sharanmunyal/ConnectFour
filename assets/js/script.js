var ConnectFour = {},
    disc_placed = 0,
    game_over = false,
    NUM_OF_BOXES = 42,
    NUM_ROWS = 6,
    NUM_COLUMNS = 7,
    board,
    player = 1,
    container;

ConnectFour = {
    init: function () {
        var self = this,
            i,
            box = $(".box");
        container = $("#game_container");
        
        for (i = 1; i < NUM_OF_BOXES; i++) {
            self.attachBox(box, i);
        }
        board = new Array(NUM_ROWS);
        for (i = 0; i < NUM_ROWS; i++)
        {
            board[i] = [-1, -1, -1, -1, -1, -1, -1];
        }
        container.on('click', function (e) {
            var targetElement = $(e.target),
                boxClicked,
                player,
                finalPosition;
            if (!game_over) {
                if (targetElement.hasClass("disc_holder"))
                    targetElement = targetElement.parent();
                boxClicked = self.calculateBoxClicked(targetElement);
                finalPosition = self.computeFinalPosition(boxClicked);
                player = self.getNextPlayer(finalPosition);
                if (finalPosition === -1) { // no position in that column hence display error and don't loose player turn
                    player = self.getCurrentPlayer(true); //true indicates revert to other player
                    self.showMessage("Player " + player + " : Try Other Column", "error");
                } else {
                    self.placeDisc(self.getCurrentPlayer(false), boxClicked, finalPosition);
                    if (disc_placed > 6) //game cannot get over before 6 discs are placed
                        game_over = self.checkIfOver(self.getCurrentPlayer(false));
                }
            }
        });
    },
    attachBox: function (box, index) {
        box.clone().attr('id', 'box' + index).appendTo("#game_container");
    },
    calculateBoxClicked: function (element) {
        if (element) {
            var boxId = element.attr('id'),
                boxNumber;
            boxNumber = parseInt(boxId.slice(3));
            return boxNumber;
        } else {
            return null;
        }
    },
    computeFinalPosition: function (position) {
        var final_position,
            row,
            column;
        row = parseInt(position / 7);
        column = position % 7;
        //three cases:
        //1. when position is white
        //2. when position is non-white(filled)
        //3. entire column is filled
        if (board[row][column] === -1) { //case 1
            while ((row+1) < NUM_ROWS && board[row+1][column] === -1) {
                row++;
            }
            final_position = row * 7 + column;
        } else if (board[row][column] !== -1) { //case 2 & 3
            if (row > 0) { //checking if not the first row
                while (row > 0 && board[row - 1][column]  !== -1) {
                    row--;
                }
                if (row === 0) { //case 3
                    final_position = -1;
                } else { //case 2
                    final_position = (row - 1) * 7 + column;
                }
            } else { //case 3
                final_position = -1;
            }
        }
        return final_position;
    },
    placeDisc: function (player, boxClicked, finalPosition) {
        var disc_color,
            i,
            iterations,
            disc_holder,
            row,
            column;

        row = parseInt(finalPosition / 7);
        column = finalPosition % 7;
        board[row][column] = player;

        if (player === 1)
            disc_color = "red"; //Player 1 indicated with red color with 1 on board array
        else if (player === 2)
            disc_color = "yellow"; //Player 2 indicated with yellow color with 2 on board array

        iterations = (finalPosition - boxClicked) / 7 + 1;
        iterations = parseInt(iterations),
        i = 0;
        if (finalPosition >= boxClicked) {
            var interval = setInterval(function () {
                if (disc_holder)
                    disc_holder.css('background-color', 'white');
                disc_holder = $("#box" + (boxClicked + 7 * i)).children(".disc_holder");
                disc_holder.css('background-color', disc_color);
                i++;
                if (i === iterations)
                    clearInterval(interval);
            }, 200);
        } else {
            disc_holder = $("#box" + finalPosition).children(".disc_holder");
            disc_holder.css('background-color', disc_color);
        }
        disc_placed++;
    },

    showMessage : function (message, message_class) {
        $(".messages").prepend("<span class="+ message_class +">" + message +"</span>");
    },

    gameOver : function (player, row, column, type) {
        var self = this;
        container.addClass("game_over");
        if (player) {
            self.showMessage("Player " + player + " : Congratulations! You won.", "won");
        }
        self.showMessage("Game Over!", null);
    },

    checkIfOver : function (player_code) {
        var i,
            j,
            self = this;
        if (disc_placed === NUM_OF_BOXES) {
            self.gameOver(null);
            return true;
        }
        //check horizontally
        for (i = 0 ; i < NUM_ROWS; i++) {
            for (j = 0; j < NUM_COLUMNS - 3; j++) {
                if (board[i][j] === player_code && board[i][j + 1] === player_code && board[i][j + 2] === player_code && board[i][j + 3] === player_code) {
                    self.gameOver(player_code, i, j, 0);
                    return true;
                }
            }
        }
        //check vertically
        for (i = 0 ; i < NUM_ROWS - 3; i++) {
            for(j = 0; j < NUM_COLUMNS; j++) {
                if (board[i][j] === player_code && board[i + 1][j] === player_code && board[i + 2][j] === player_code && board[i + 3][j] === player_code) {
                    self.gameOver(player_code, i, j, 1);
                    return true;
                }
            }
        }
        //check diagonally
        for (i = 0 ; i < NUM_ROWS - 3; i++) {
            for (j = 0; j < NUM_COLUMNS - 3; j++) {
                //check top left to bottom right
                if (board[i][j] === player_code && board[i + 1][j + 1] === player_code && board[i + 2][j + 2] === player_code && board[i + 3][j + 3] === player_code) {
                    self.gameOver(player_code, i, j, 2);
                    return true;
                } //check top right to bottom left
                else if (board[i][j + 3] === player_code && board[i + 1][j + 2] === player_code && board[i + 2][j + 1] === player_code && board[i + 3][j] === player_code) {
                    self.gameOver(player_code, i, j, 3);
                    return true;
                }
            }
        }
        return false;
    },
    getCurrentPlayer : function (flag) {
        if (flag)
            return Math.abs(player - 1) + 1;
        else
            return player + 1;
    },
    getNextPlayer: function (final_position) {
        var current_player = player;
        if (final_position !== -1) {
            $(".player_number").text(player + 1);
            player = Math.abs(player - 1);
            current_player = player;
        }
        return current_player;
    }
};
ConnectFour.init();
