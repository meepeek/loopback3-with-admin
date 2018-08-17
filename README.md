# loopback3-with-admin

Prerequisite
- you will need lerna to run
```
npm i -g lerna
```

Installation
```
git clone https://github.com/meepeek/loopback3-with-admin
cd loopback3-with-admin
lerna bootstrap && lerna run dev --stream
```

react-admin will run on http://localhost:3000/
loopback server will run on http://localhost:3333/

Post Installation Setup
- goto http://localhost:3333/explorer
- call REST api to create SystemUser
- goto http://localhost:3000/ then login with the user being created
