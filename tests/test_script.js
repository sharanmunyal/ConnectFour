describe("ConnectFour", function() {
    //test checkIfOver
    describe("when the game is empty", function() {
        it("returns false", function() {
            var result = ConnectFour.checkIfOver(0);
            expect(result).to.equal(false);
        });

        it("returns false", function() {
            var result = ConnectFour.checkIfOver(1);
            expect(result).to.equal(false);
        });
    });

    //test calculateBoxClicked
    describe("return what box is clicked", function() {
        it("returns null for no input", function() {
            var result = ConnectFour.calculateBoxClicked();
            expect(result).to.equal(null);
        });

        it("returns box id number", function() {
            var element = document.createElement("div");
            element.setAttribute("id","box31");
            var result = ConnectFour.calculateBoxClicked($(element));
            expect(result).not.to.be.a(Number);
            expect(result).to.be.equal(31);
        });
    });

    //test getCurrentPlayer
    describe("return the current player", function() {
        before(function(){
            player = 1;
        });
        it("returns player when column is filled", function(){
            var result = ConnectFour.getCurrentPlayer(true);
            expect(result).to.equal(1);
        });
        it("returns the current player when disc is placed", function(){
            var result = ConnectFour.getCurrentPlayer(false);
            expect(result).to.equal(2);
        });
    });

    //test getCurrentPlayer
    describe("return the next player", function() {
        before(function(){
            player = 1;
        });
        it("returns the same player when column filled", function(){
            var result = ConnectFour.getNextPlayer(-1);
            expect(player).to.equal(1);
        });
        it("returns the next player after disc placed successfully", function(){
            var result = ConnectFour.getNextPlayer(21);
            expect(player).to.equal(0);
        });
    });

    //test checkIfOver
    describe("check if the game ended", function(){
        var result;
        before(function(){
            disc_placed = 42;
            board = [[1,2,1,2,1,2,1],
                    [1,2,1,2,1,2,1],
                    [2,1,2,1,2,1,2],
                    [2,1,2,1,2,1,2],
                    [1,2,1,2,1,2,1],
                    [1,2,1,2,1,2,1]];
        });
        it("return board is filled", function(){
            result = ConnectFour.checkIfOver(1);
            expect(result).to.equal(true);
        });

        before(function(){
            disc_placed = 8;
            board = [[1,1,1,1,-1,-1,-1,-1],
                [2,2,2,-1,-1,-1,-1],
                [2,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1]];
        });
        it("return player 1 won", function(){
            result = ConnectFour.checkIfOver(1);
            expect(result).to.equal(true);
        });
        it("return player 2 didn't win", function(){
            result = ConnectFour.checkIfOver(2);
            expect(result).to.equal(false);
        });

        before(function(){
            disc_placed = 8;
            board = [[1,1,1,1,-1,-1,-1,-1],
                [2,2,2,-1,-1,-1,-1],
                [2,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1]];
        });
        it("return player 1 won(check horizontally)", function(){
            result = ConnectFour.checkIfOver(1);
            expect(result).to.equal(true);
        });
        it("return player 2 didn't win(check horizontally)", function(){
            result = ConnectFour.checkIfOver(2);
            expect(result).to.equal(false);
        });

        before(function(){
            disc_placed = 8;
            board = [[1,-1,-1,-1,-1,-1,-1,-1],
                [1,-1,2,-1,-1,-1,-1],
                [1,-1,-1,2,-1,-1,-1],
                [1,-1,-1,-1,2,-1,-1],
                [-1,2,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1]];
        });
        it("return player 1 won(check vertically)", function(){
            result = ConnectFour.checkIfOver(1);
            expect(result).to.equal(true);
        });
        it("return player 2 didn't win(check vertically)", function(){
            result = ConnectFour.checkIfOver(2);
            expect(result).to.equal(false);
        });
    });
});