<?php
include '/home/hachari/m2.center/wp-admin/wp-load.php';

$data = [
	'title' => carbon_get_theme_option('quiz-metatitle'),
	'head' => carbon_get_theme_option('quiz-js_head'),
	'body' => carbon_get_theme_option('quiz-js_body'),
	'favicon' => carbon_get_theme_option('quiz-js_favicon'),
];

Timber::render('index.html', $data);
