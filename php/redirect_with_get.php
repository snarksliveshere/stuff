<?php
$data = file('data1.txt',FILE_IGNORE_NEW_LINES);

foreach ($data as $value) {
	if(strpos($value, '?')) {
		$value = str_replace('http://hummel-russia.ru/', '', $value);
		$arr  = explode(' ', $value);
		$num = strpos($arr[0], '?');
		$str = substr($arr[0], $num+1);
		$arr[0] = 'RewriteCond %{QUERY_STRING} ^' .$str . '$';
		$arr[1] = 'RewriteRule ^.*$ /' . $arr[1] . "? [R=301,L]\n";
		//var_dump($arr);
		$res = implode("\n", $arr);
		file_put_contents('redirect.txt', $res, FILE_APPEND);

	} else {
		$value = str_replace('http://hummel-russia.ru/', '', $value);
		$arr  = explode(' ', $value);
		$arr[0] = 'RewriteRule ^' . $arr[0] . '$';
		$arr[1] = '/' . $arr[1] . " [R=301,L]\n"; 
		//var_dump($arr);
		$res = implode(' ', $arr);
		//var_dump($res);
		file_put_contents('redirect.txt', $res, FILE_APPEND);
	}
}

/*
http://hummel-russia.ru/products/online-catalogue/catalog?catid=810	http://hummel-russia.ru/catalog/armatura_i_komplektuyushchie/

RewriteCond %{QUERY_STRING} ^catid=810$
RewriteRule ^.*$ /catalog/armatura_i_komplektuyushchie/? [R=301,L]


http://hummel-russia.ru/armatura-i-komplektuyushchie-dlya-otopleniya	http://hummel-russia.ru/catalog/armatura_i_komplektuyushchie/

RewriteRule ^armatura-i-komplektuyushchie-dlya-otopleniya$ /catalog/armatura_i_komplektuyushchie/ [R=301,L]

*/