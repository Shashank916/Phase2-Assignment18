document.addEventListener("DOMContentLoaded", () => {
    const playerList = document.getElementById("playerList");
    const createPlayerForm = document.getElementById("createPlayerForm");
    const updatePlayerForm = document.getElementById("updatePlayerForm");
    const deletePlayerForm = document.getElementById("deletePlayerForm");

    function displayPlayers() {
        fetch("http://localhost:5177/api/players")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(players => {
                playerList.innerHTML = "";
                players.forEach(player => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `Player ID: ${player.playerId}, First Name: ${player.firstName}, Last Name: ${player.lastName}, Jersey Number: ${player.jerseyNo}, Position: ${player.position}, Team: ${player.team}, Date of Joining: ${player.doj}`;
                    playerList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error("Fetch Error:", error);
                playerList.innerHTML = "Error fetching players.";
            });
    }

    createPlayerForm.addEventListener("submit", e => {
        e.preventDefault();
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const jerseyNo = document.getElementById("jerseyNo").value;
        const position = document.getElementById("position").value;
        const team = document.getElementById("team").value;
        const doj = document.getElementById("doj").value;

        fetch("http://localhost:5177/api/players", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, jerseyNo, position, team, dateofJoining: doj })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                // Clear fields after successful creation
                document.getElementById("firstName").value = "";
                document.getElementById("lastName").value = "";
                document.getElementById("jerseyNo").value = "";
                document.getElementById("position").value = "";
                document.getElementById("team").value = "";
                document.getElementById("doj").value = "";
                // Refresh the player list
                displayPlayers();
            })
            .catch(error => {
                console.error("Fetch Error:", error);
            });
    });

    updatePlayerForm.addEventListener("submit", e => {
        e.preventDefault();
        const playerId = document.getElementById("playerId").value;
        const newFirstName = document.getElementById("newFirstName").value;
        const newLastName = document.getElementById("newLastName").value;
        const newJerseyNo = document.getElementById("newJerseyNo").value;
        const newPosition = document.getElementById("newPosition").value;
        const newTeam = document.getElementById("newTeam").value;
        const newDoj = document.getElementById("newDoj").value;

        fetch(`http://localhost:5177/api/players/${playerId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                playerId,
                firstName: newFirstName,
                lastName: newLastName,
                jerseyNumber: newJerseyNo,
                position: newPosition,
                team: newTeam,
                dateofJoining: newDoj
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                document.getElementById("playerId").value = "";
                document.getElementById("newFirstName").value = "";
                document.getElementById("newLastName").value = "";
                document.getElementById("newJerseyNo").value = "";
                document.getElementById("newPosition").value = "";
                document.getElementById("newTeam").value = "";
                document.getElementById("newDoj").value = "";
                displayPlayers();
            })
            .catch(error => {
                console.error("Fetch Error:", error);
            });
    });

    deletePlayerForm.addEventListener("submit", e => {
        e.preventDefault();
        const deletePlayerId = document.getElementById("deletePlayerId").value;

        fetch(`http://localhost:5177/api/players/${deletePlayerId}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                document.getElementById("deletePlayerId").value = "";
                displayPlayers();
            })
            .catch(error => {
                console.error("Fetch Error:", error);
            });
    });

    displayTask();
});