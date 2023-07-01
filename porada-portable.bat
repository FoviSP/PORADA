@echo off

if not exist pgsql/ ( 
  aria2c\aria2c.exe -x 16 https://sbp.enterprisedb.com/getfile.jsp?fileid=1258421
  7z\7z.exe x postgresql-15.2-2-windows-x64-binaries.zip
  del postgresql-15.2-2-windows-x64-binaries.zip
)

pgsql\bin\initdb.exe -D pgsql-data -U postgres
cls
pgsql\bin\pg_ctl.exe -D pgsql-data start
start cmd /k Call porada-serverside\SERVER.bat
start cmd /k Call porada-clientside\SERVER.bat
pgsql\bin\psql.exe -U postgres -c \gexec -c "SELECT 'CREATE DATABASE webforum' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'webforum')"