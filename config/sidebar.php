<?php

return [

    /*
    |--------------------------------------------------------------------------
    | View Storage Paths
    |--------------------------------------------------------------------------
    |
    | Most templating systems load templates from disk. Here you may specify
    | an array of paths that should be checked for your views. Of course
    | the usual Laravel view path has already been registered for you.
    |
    */

    'menu' => [[
		'icon' => 'fad fa-tachometer-alt-fast',
		'title' => 'Dashboard',
		'url' => '/dashboard',
		'id' => 'dashboard'
	],[
		'icon' => 'fad fa-database',
		'title' => 'Data Master',
		'url' => 'javascript:;',
		'caret' => true,
		'id' => 'datamaster',
		'sub_menu' => [[
			'url' => '/tipekonstruksi',
			'id' => 'tipekonstruksi',
			'title' => 'Tipe Konstruksi'
        ]]
	],[
		'icon' => 'fad fa-building',
		'title' => 'Infrastruktur',
		'url' => 'javascript:;',
		'caret' => true,
		'id' => 'infrastruktur',
		'sub_menu' => [[
            'title' => 'ISDA',
            'url' => 'javascript:;',
            'caret' => true,
            'id' => 'isda',
            'sub_menu' => [[
                'url' => '/bendungan',
                'id' => 'bendungan',
                'title' => 'Bendungan'
            ],[
                'url' => '/daerahirigasi',
                'id' => 'daerahirigasi',
                'title' => 'Daerah Irigasi'
            ],[
                'url' => '/das',
                'id' => 'das',
                'title' => 'DAS'
            ],[
                'url' => '/embung',
                'id' => 'embung',
                'title' => 'Embung'
            ],[
                'url' => '/mataair',
                'id' => 'mataair',
                'title' => 'Mata Air'
            ],[
                'url' => '/poshidrologi',
                'id' => 'poshidrologi',
                'title' => 'Pos Hidrologi'
            ],[
                'url' => '/sumur',
                'id' => 'sumur',
                'title' => 'Sumur'
            ]]
        ],[
			'url' => '/jalan',
			'id' => 'jalan',
			'title' => 'Jalan'
        ],[
			'url' => '/jembatan',
			'id' => 'jembatan',
			'title' => 'Jembatan'
		],]
    ],[
		'icon' => 'fad fa-user',
		'title' => 'Pengguna',
		'url' => '/pengguna',
		'id' => 'pengguna'
	],[
		'icon' => 'fad fa-map',
		'title' => 'Wilayah',
		'url' => 'javascript:;',
		'caret' => true,
		'id' => 'wilayah',
		'sub_menu' => [[
			'url' => '/kabupatenkota',
			'id' => 'kabupatenkota',
			'title' => 'Kabupaten/Kota'
        ],[
			'url' => '/kecamatan',
			'id' => 'kecamatan',
			'title' => 'Kecamatan'
        ],[
			'url' => '/kelurahandesa',
			'id' => 'kelurahandesa',
			'title' => 'Kelurahan/Desa'
		]]
	]]
];
