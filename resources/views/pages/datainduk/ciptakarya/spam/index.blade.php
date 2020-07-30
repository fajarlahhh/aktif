@extends('pages.datainduk.main')

@section('title', ' | SPAM')

@push('css')
	<link href="{{ url('/public/assets/plugins/bootstrap-select/dist/css/bootstrap-select.min.css') }}" rel="stylesheet" />
	<link href="{{ url('/public/assets/plugins/parsleyjs/src/parsley.css') }}" rel="stylesheet" />
@endpush

@section('page')
<li class="breadcrumb-item"><a href="javascript:;">Cipta Karya</a></li>
	<li class="breadcrumb-item active">SPAM</li>
@endsection

@section('header')
	<h1 class="page-header">SPAM</h1>
@endsection

@section('subcontent')
<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
    <!-- begin panel-heading -->
    <div class="panel-heading">
        <div class="row">
            <div class="col-md-2 col-lg-2 col-xl-2 col-xs-12">
                @role('user|super-admin|supervisor')
                <div class="form-inline">
                    <a href="{{ route('spam.tambah') }}" class="btn btn-primary">Tambah</a>
                </div>
                @endrole
            </div>
            <div class="col-md-10 col-lg-10 col-xl-10 col-xs-12">
                <form id="frm-cari" action="{{ route('spam') }}" method="GET">
                    <div class="form-inline pull-right">
                        <div class="form-group">
                            <select class="form-control selectpicker cari" name="jenis" data-live-search="true" data-style="btn-danger" data-width="100%">
                                <option value="semua" {{ $jenis == 'semua'? 'selected': ''}}>Semua Jenis</option>
                                <option value="1" {{ $jenis == '1'? 'selected': ''}}>Kewenangan Provinsi</option>
                                <option value="0" {{ $jenis == '0'? 'selected': ''}}>POKIR</option>
                            </select>
                        </div>&nbsp;
                        <div class="input-group">
                            <input type="text" class="form-control cari" name="cari" placeholder="Pencarian" aria-label="Sizing example input" autocomplete="off" aria-describedby="basic-addon2" value="{{ $cari }}">
                            <div class="input-group-append">
                                <span class="input-group-text" id="basic-addon2"><i class="fas fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="panel-body">
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="align-middle" rowspan="2">No.</th>
                        <th class="align-middle" rowspan="2">Nama Unit</th>
                        <th class="align-middle" rowspan="2">Tahun Pembuatan</th>
                        <th class="align-middle" rowspan="2">Biaya Pembuatan</th>
                        <th colspan="4" class="text-center">Kapasitas</th>
                        <th class="align-middle" rowspan="2">Jumlah SR</th>
                        <th class="align-middle" rowspan="2">Jumlah Jiwa Terlayani</th>
                        <th class="align-middle" rowspan="2">Keterangan</th>
                        <th colspan="3" class="text-center">Lokasi</th>
                        <th class="width-90 align-middle" rowspan="2"></th>
                    </tr>
                    <tr>
                        <th>Terpasang</th>
                        <th>Produksi</th>
                        <th>Distribusi</th>
                        <th>Idle</th>
                        <th>Kelurahan/Desa</th>
                        <th>Kecamatan</th>
                        <th>Kabupaten/Kota</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($data as $row)
                    <tr>
                        <td class="align-middle width-10">{{ ++$i }}</td>
                        <td class="align-middle">
                            @if ($row->marker)
                                <a href="#modal-peta" data-toggle="modal" onclick="peta('{{ $row->spam_id }}')">
                                    {{ $row->spam_nama_unit }}
                                </a>
                            @else
                            {{ $row->spam_nama_unit }}
                            @endif
                        </td>
                        <td class="align-middle">{{ $row->spam_tahun_pembuatan  }}</td>
                        <td class="align-middle text-right">{{ $row->spam_biaya_pembuatan != 0? number_format($row->spam_biaya_pembuatan, 2): "-" }}</td>
                        <td class="align-middle text-right">{{ $row->spam_kapasitas_terpasang != 0? number_format($row->spam_kapasitas_terpasang, 2): "-" }}</td>
                        <td class="align-middle text-right">{{ $row->spam_kapasitas_produksi != 0? number_format($row->spam_kapasitas_produksi, 2): "-" }}</td>
                        <td class="align-middle text-right">{{ $row->spam_kapasitas_distribusi != 0? number_format($row->spam_kapasitas_distribusi, 2): "-" }}</td>
                        <td class="align-middle text-right">{{ $row->spam_kapasitas_idle != 0? number_format($row->spam_kapasitas_idle, 2): "-" }}</td>
                        <td class="align-middle text-right">{{ $row->spam_jumlah_sr != 0? number_format($row->spam_jumlah_sr): "-" }}</td>
                        <td class="align-middle text-right">{{ $row->spam_jumlah_jiwa_terlayani != 0? number_format($row->spam_jumlah_jiwa_terlayani): "-" }}</td>
                        <td class="align-middle">{{ $row->spam_keterangan }}</td>
                        <td class="align-middle">{{ $row->kelurahan_desa_id? $row->kelurahan_desa->kelurahan_desa_nama: '' }}</td>
                        <td class="align-middle">{{ $row->kecamatan_id? $row->kecamatan->kecamatan_nama: '' }}</td>
                        <td class="align-middle">{{ $row->kabupaten_kota_id? $row->kabupaten_kota->kabupaten_kota_nama: '' }}</td>
                        <td class="text-right align-middle">
                            @role('super-admin|supervisor|user')
                            <a href="{{ route('spam.edit', ['id' => $row->spam_id]) }}" class="m-2"><i class='fad fa-edit fa-lg text-blue-darker'></i></a>
                            <a href="javascript:;" onclick="hapus('{{ $row->spam_id }}', '{{ $row->spam_nama_unit }}')" class="m-2" id='btn-del' data-toggle="tooltip" title="Hapus Data"><i class='fad fa-trash fa-lg text-red-darker'></i></a>
                            @endrole
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    <div class="panel-footer form-inline">
        <div class="col-md-6 col-lg-10 col-xl-10 col-xs-12">
            {{ $data->links() }}
        </div>
        <div class="col-md-6 col-lg-2 col-xl-2 col-xs-12">
            <label class="pull-right">Jumlah Data : {{ $data->total() }}</label>
        </div>
        This page took {{ (microtime(true) - LARAVEL_START) }} seconds to render
    </div>
</div>
@include('includes.component.modal', ['judul' => 'Peta Lokasi'])
@endsection

@push('scripts')
<script src="{{ url('/public/assets/plugins/bootstrap-select/dist/js/bootstrap-select.min.js') }}"></script>
<script>
    $(".cari").change(function() {
         $("#frm-cari").submit();
    });

    function peta(id){
        $("#modal-content").load("{{ url('/spam/peta') }}?id=" + id);
    }

    function hapus(id, ket) {
        Swal.fire({
            title: 'Hapus Data',
            text: 'Anda akan menghapus spam ' + ket + '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            if (result.value == true) {
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    url: '{{ url("/spam/hapus/") }}/' + id,
                    type: "POST",
                    data: {
                        "_method": 'DELETE'
                    },
                    success: function(data){
                        location.reload(true);
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hapus data',
                            text: xhr.status
                        })
                    }
                });
            }
        });
    }
</script>
@endpush