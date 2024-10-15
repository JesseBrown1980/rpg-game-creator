/* eslint-disable no-unused-vars */ 
function navigateTo(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'block';
    } else {
        console.error(`Page ID '${pageId}' not found.`);
    }
}
/* eslint-enable no-unused-vars */