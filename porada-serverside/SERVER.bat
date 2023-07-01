
if exist porada-serverside/ ( 
  cd porada-serverside
)

if not exist node_modules/ ( 
  call npm i
)

cls
node index.js
echo END
pause