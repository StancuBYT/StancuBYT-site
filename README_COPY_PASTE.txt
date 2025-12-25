CLOUD FUNCTION PATCH (copy/paste)

1) In proiectul tau:
   - creeaza folderul: functions/
   - pune in el: index.js si package.json din acest zip
   - in radacina proiectului: firebase.json din acest zip (ai grija sa fie JSON valid)

2) Seteaza cheia Etherscan (una din variante):
   A) Config:
      firebase functions:config:set etherscan.key="CHEIA_TA"
   B) Environment (local deploy):
      export ETHERSCAN_API_KEY="CHEIA_TA"

3) Deploy:
   npm install --prefix functions
   npx firebase deploy --only functions

URL-ul:
https://us-central1-<project-id>.cloudfunctions.net/etherscanProxy
