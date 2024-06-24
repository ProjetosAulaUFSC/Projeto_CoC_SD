let currentDatabaseIndex = 0;

function getNextDatabase(databases) {
    const selectedDatabase = databases[currentDatabaseIndex];
    currentDatabaseIndex = selectedDatabase.nextDatabaseIndex;
    return selectedDatabase.connection;
}

module.exports = { getNextDatabase };