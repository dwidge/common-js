# // Copyright DWJ 2024.
# // Distributed under the Boost Software License, Version 1.0.
# // https://www.boost.org/LICENSE_1_0.txt

export REACT_APP_API=http://api:4002/api
TESTER_EMAIL=test@localhost.local
TESTER_PASSWORD=TESTER_PASSWORD

docker compose up --build -d
sleep 5
TOKEN=$(curl -X POST -H "Content-Type: application/json" -d "{\"email\":\"$TESTER_EMAIL\",\"password\":\"$TESTER_PASSWORD\"}" http://localhost:4002/api/login)
echo $TOKEN
docker run --network=api_backend schemathesis/schemathesis:stable run -H "Authorization: $TOKEN" --checks all $REACT_APP_API/docs/open-api.json
