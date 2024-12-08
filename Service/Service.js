document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var sidebarToggle = document.getElementById('sidebar-toggle');
    var content = document.querySelector('.content');
    var body = document.body;

    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('open');
        body.classList.toggle('sidebar-open');
    });
});
