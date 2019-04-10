document.addEventListener('DOMContentLoaded', function () {
    const htmlList = document.getElementById('todo-list');

    const addButton = document.getElementById('add-btn');

    const db = firebase.firestore();

    addButton.addEventListener('click', addItem);

    htmlList.addEventListener('click', onListClicked)

    function getItem() {
        db.collection('todoList').get()
            .then(function (snap) {
                render(snap.docs);
            });
    }

    function onListClicked(event) {
        let clickedArea = event.target;
        let i = parseInt(clickedArea.dataset.id);
        db.collection('todoList').get()
            .then(function(snap) {
                deleteId = snap.docs[i].id;
                db.collection('todoList').doc(deleteId).delete();
                getItem();
            });
    }

    function addItem() {
        let input = document.getElementById('new-item');
        let value = input.value;
        db.collection("todoList").add({
            content: value
        });
        getItem();
        input.value = '';
    }

    function render(items) {
        let content = items.map(function (item, i) {
            return '<li>' + item.data().content.toUpperCase() + ' <button data-id="' + i + '">DELETE</button></li>';
        });
        htmlList.innerHTML = content.join('');
    }

    getItem();
});