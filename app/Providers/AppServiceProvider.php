<?php

namespace App\Providers;

use App\Periode;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        config(['app.locale' => 'id']);
        \Carbon\Carbon::setLocale('id');

        view()->composer('*', function ($view){
            if(Auth::check()){
                $periode = collect(json_decode(Redis::get('periode_aktif')));
                $pegawai = collect(json_decode(Redis::get(Session::getId())));
                $foto = Auth::user() && Auth::user()->pengguna_foto? Storage::url(Auth::user()->pengguna_foto): '/assets/img/user/user.png';
                return $view->with('foto_pegawai', $foto)->with('nama_pegawai', $pegawai['nama'])->with('bagian_pegawai', $pegawai['bagian'])->with('periode_aktif', $periode);
            }
        });
    }
}