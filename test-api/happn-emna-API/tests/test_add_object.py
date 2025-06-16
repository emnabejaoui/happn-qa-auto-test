import pytest
from tests.pages.object_page import ObjectPage


def test_add_object():
    object_page = ObjectPage()
    response = object_page.create_object(
        name="ObjToAdd",
        data={
            "country": "france",
            "who": "emna"
        }
    )

    assert "id" in response, "L'objet n'a pas de champ ID"
    assert response["name"] == "ObjToAdd", "name is false"
    assert isinstance(response["data"], dict), "data is not un object"
    assert response["data"]["country"] == "france", "country does not match"
    assert response["data"]["who"] == "emna", "who does not match"

    print(f"Good : Objet ajouté avec succès : ID = {response['id']}")
