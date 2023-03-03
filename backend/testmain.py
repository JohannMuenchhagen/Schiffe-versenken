from fastapi.testclient import TestClient
from .main import app


class TestMain:
    def test_get(self):
        client = TestClient(app)
        response = client.get("/")
        assert response.json() == {'message': 'Hello User'}

    def test_websocket_endpoint(self):
        client = TestClient(app)
        with client.websocket_connect("/game") as websocket:
            websocket.send_json({"Type": "initialize Game"})
            data = websocket.receive_json()
            assert data == {'Message': 'Game successfully initialized', 'GameID': 1,
                            'PlayerID': 1}
