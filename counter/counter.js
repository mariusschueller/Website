document.addEventListener('DOMContentLoaded', () => {
    // Send a background request to increment the counter
    fetch('/counter/counter.php', { method: 'GET' })
      .then(() => {
        console.log('Visit counted.');
      })
      .catch(error => {
        console.error('Error counting visit:', error);
      });
  });