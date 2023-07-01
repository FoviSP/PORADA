
if exist porada-clientside/ ( 
  cd porada-clientside
)

if not exist node_modules/ ( 
  call npm i
)
cls
npm start
echo END
pause