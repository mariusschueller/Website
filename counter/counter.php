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

// Log the visit details
$visit_time = date("Y-m-d H:i:s");
$visitor_ip = $_SERVER['REMOTE_ADDR'];
$visited_page = $_SERVER['HTTP_REFERER'] ?? $_SERVER['REQUEST_URI']; // Capture the referring page or fallback to current script
$log_entry = "Visit $count | Time: $visit_time | IP: $visitor_ip | Page: $visited_page\n";
file_put_contents($log_file, $log_entry, FILE_APPEND);

// Send a 200 OK response (only in a web server context)
if (php_sapi_name() !== 'cli') {
    http_response_code(200);
}
?>
