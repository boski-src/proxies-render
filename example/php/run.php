<?php

function curl($url, $proxy = null) {
    $ch = curl_init($url);
    $browser = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36";
    curl_setopt($ch, CURLOPT_USERAGENT, $browser);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    if ($proxy) {
        curl_setopt($ch, CURLOPT_PROXYPORT, $proxy->port);
        //curl_setopt($ch, CURLOPT_PROXYTYPE, 'HTTP');
        curl_setopt($ch, CURLOPT_PROXY, $proxy->ip);
        curl_setopt($ch,CURLOPT_TIMEOUT,30);
        //curl_setopt($ch, CURLOPT_VERBOSE, true);
    }

    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

    $result = curl_exec($ch);
    curl_close($ch);
    print_r($result);

    return $result;
}

function execute($url, $proxies = [], $maxRetries = 5)
{
    $result = "";
    if (count($proxies)) {
        for ($retry = 0; $retry <= $maxRetries; $retry++) {
            try {
                if (!isset($proxies[$retry])) break;

                $proxy = $proxies[$retry];
                $result = curl($url, $proxy);
                break;
            } catch (Exception $exception) {
            } finally {

            }
            echo "Retry: $retry".PHP_EOL;
        }
    } else {
        $result = curl($url);
    }

    if (!$result) return null;

    $result = preg_replace('|\<!doctype html>(.*?){"responseContext":|is', '{"responseContext":', $result);
    $result = preg_replace('|\"}};(.*?)</html>|is', '"}}', $result);

    return $result;
}

// Config
$pathToProxies = "/home/boski/Desktop/Projects-December-2019/proxies-renderer/bin/proxies.json";
$maxRetries = 60;

// Parsing
$proxiesFile = file_get_contents($pathToProxies);
$proxies = json_decode($proxiesFile);

// Run

$url = execute('https://youtube.com/watch?v=1k0B3FG5jzU', $proxies, $maxRetries);

echo $url;