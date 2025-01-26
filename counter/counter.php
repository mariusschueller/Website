<?php
$counter_file = "counter.txt";
$log_file = "visit_log.txt";

// Increment the counter
if (!file_exists($counter_file)) {
    file_put_contents($counter_file, "0");
}
$count = (int)file_get_contents($counter_file);
$count++;
file_put_contents($counter_file, $count);

// Log the visit details (including page URL)
$visit_time = date("Y-m-d H:i:s");
$visited_page = $_SERVER['REQUEST_URI'];  // Get the current page URL
$log_entry = "Visit $count | Time: $visit_time | Page: $visited_page\n";
file_put_contents($log_file, $log_entry, FILE_APPEND);

// Send a 200 OK response
http_response_code(200);
?>
