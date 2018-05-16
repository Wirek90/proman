// It uses data_handler.js to visualize elements
let dom = {
    loadBoards: function() {
        let boards = dataHandler.getBoards();
        return this.showBoards(boards);
    },

    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardsDiv = document.getElementById('boards');
        boardsDiv.innerHTML = "";
        for (let i = 0; i < boards.length; i++) {

            let boardBox = document.createElement("div");
            boardBox.id = "board-box-" + boards[i].id;
            boardBox.className = "container";

            let singleBoard = document.createElement("div");
            singleBoard.id = "board-" + boards[i].id;
            singleBoard.className = "row";

            let titleButton = document.createElement("button");
            titleButton.id = "board-" + boards[i]["id"] + "-btn";
            titleButton.className = "btn-primary";
            titleButton.style.width = "100%";
            singleBoard.appendChild(titleButton);

            boardBox.appendChild(titleButton);
            boardBox.appendChild(singleBoard);

            let buttonHeader = document.createElement("h4");
            let txt = document.createTextNode(boards[i]["title"]);
            buttonHeader.appendChild(txt);
            titleButton.appendChild(buttonHeader);

            let statuses = dataHandler.getStatuses();
            statuses.forEach(function(status) {
                let newStatus = document.createElement("div");
                newStatus.id = "board-" + boards[i].id + "-status-" + status.id;
                newStatus.className = "col";
                let cardsWindow = document.createElement("div");
                cardsWindow.id = "card-" + boards[i].id + "-box-" + status.id;
                let cardsWindowHeight = cardsWindow.offsetHeight + 40;
                cardsWindow.style.height = cardsWindowHeight + "px";
                let newStatusHeader = document.createElement("h5");
                newStatusHeader.style.textAlign = "center";
                let newStatusTitle = document.createTextNode(status.name);

                singleBoard.appendChild(newStatus);
                newStatus.appendChild(newStatusHeader);
                newStatusHeader.appendChild(newStatusTitle);
                newStatus.appendChild(cardsWindow);
            })

            boardsDiv.appendChild(boardBox);
            let board = boards[i];
            let id = board.id;
            let boardDiv = document.getElementById('board-'+ id);

            if (board.is_active) {
                boardDiv.style.display = ""
            } else {
                boardDiv.style.display = "none";
            }
            titleButton.onclick = function() {
                dataHandler.changeStatus(id);
                dom.loadBoards();
            };
        }
    },
    loadCards: function(boardId) {

          let boardCards = dataHandler.getCardsByBoardId(boardId);
          if (boardCards) {
              return showCards(boardId, boardCards);
          } else {
              return null;
          }
    },
    showCards: function(boardId, cards) {
      let statuses = dataHandler.getStatuses();

      for (i = 1; i <= statuses.length; i++) {
          for (c = 0; c< cards.length; c++) {

            if (cards[c].status_id === i) {
                let statusDiv = document.getElementById("card-" + boardId + "-box-" + i);
                let cardDiv =  document.createElement("div");
                let txt = document.createTextNode(cards[c]["title"]);
                cardDiv.className = "card";
                cardDiv.id = cards[c].id;
                cardDiv.appendChild(txt);
                statusDiv.appendChild(cardDiv);
          };
        };
      };
    },

        // shows the cards of a board
        // it adds necessary event listeners also
    appendToElement: function(elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    }
    // here comes more features
}

menuButtons = function () {

    let modal = document.getElementById('addNewBoardForm');
    let btn = document.getElementById("addNewBoardButton");
    let span = document.getElementsByClassName("close")[0];
    let boardName = document.getElementById('boardName');
    let saveBoardName = document.getElementById('saveBoardName');

    btn.onclick = function() {
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == 'addNewBoardButton') {
            modal.style.display = "none";
        }
    }
    saveBoardName.onclick = function(){
        let newBoardName = boardName.value;
        if (newBoardName == ''){
            alert("Please insert something");
        } else {
            modal.style.display = "none";
            dataHandler.createNewBoard(newBoardName);
            dom.loadBoards();
            boardName.value = '';
        }
    };

};

menuButtons()
