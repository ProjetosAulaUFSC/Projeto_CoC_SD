const baseUrl = process.env.DATABASE_URL;

let databases = [];

for(let i=1; i<5; i++){
    databases.push({
        id: i,
        uri: `${baseUrl}Server${i}`,
        nextServer: i%4+1,
        hasToken: false
    })
}

module.exports = { databases }