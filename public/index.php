<?php
include '/home/hachari/m2.center/wp-admin/wp-load.php';

$data = [
	'title' => carbon_get_theme_option('quiz-metatitle'),
	'jshead' => carbon_get_theme_option('quiz-js_head'),
	'jsbody' => carbon_get_theme_option('quiz-js_body'),
	'favicon' => carbon_get_theme_option('quiz-js_favicon'),
	'custom_meta' => carbon_get_theme_option('quiz-custom_meta'),
];

Timber::render('index.html', $data);
