@echo off

setlocal

set "workDir=%cd%"

echo Starting to deploy microservices

for /d %%i in (%workDir%\microservices\*) do (
    echo deploying microservice: %%~nxi
    cd "%%i"
    serverless deploy
)

echo Completed deployment of microservices
