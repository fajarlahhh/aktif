@extends('pages.administrator.main')

@section('title', ' | Periode Anggaran')

@push('css')
	<link href="/assets/plugins/bootstrap-select/dist/css/bootstrap-select.min.css" rel="stylesheet" />
	<link href="/assets/plugins/parsleyjs/src/parsley.css" rel="stylesheet" />
	<link href="/assets/plugins/switchery/switchery.min.css" rel="stylesheet" />
@endpush

@section('page')
	<li class="breadcrumb-item active">Periode Anggaran</li>
@endsection

@section('header')
	<h1 class="page-header">Periode Anggaran</h1>
@endsection

@section('subcontent')
<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
    <!-- begin panel-heading -->
    <div class="panel-heading">
        <div class="row">
            <div class="col-md-5 col-lg-5 col-xl-5 col-xs-12">
                @role('user|administrator')
                <div class="form-inline">
                    <a href="{{ route('periode.tambah') }}" class="btn btn-primary"><i class="fad fa-plus"></i> Tambah</a>
                </div>
                @endrole
            </div>
            <div class="col-md-7 col-lg-7 col-xl-7 col-xs-12">
                <form id="frm-cari" action="{{ route('periode') }}" method="GET">
                    <div class="form-inline pull-right">
                        <div class="input-group">
                            <input type="text" class="form-control cari" name="cari" placeholder="Cari" aria-label="Sizing example input" autocomplete="off" aria-describedby="basic-addon2" value="{{ $cari }}">
                            <div class="input-group-append">
                                <span class="input-group-text" id="basic-addon2"><i class="fad fa-search"></i></span>
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
                        <th>No.</th>
                        <th>Tahun</th>
                        <th>Operator</th>
                        <th>Status</th>
                        <th class="width-90"></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($data as $index => $row)
                    <tr>
                        <td>{{ ++$i }}</td>
                        <td>{{ $row->periode_tahun }}</td>
                        <td>{{ $row->pegawai->nm_pegawai }}<br><small>{{ \Carbon\Carbon::parse($row->created_at)->isoFormat('LLL') }}</small></td>
                        <td>
                            <input type="checkbox" data-render="switchery" {{ $row->trashed()? '': 'checked' }} data-theme="yellow" data-id="{{ $row->periode_tahun }}" data-status="{{ $row->trashed()? 0: 1 }}" data-change="check-switchery-state-text"/>
                        </td>
                        <td class="text-center align-middle">
                            @role('administrator|supervisor')
                            <a href="javascript:;" onclick="hapus('{{ $row->periode_tahun }}')" class="m-2" id='btn-del' data-toggle="tooltip" title="Hapus Data"><i class='fad fa-trash fa-lg text-red-darker'></i></a>
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
@endsection

@push('scripts')
<script src="/assets/plugins/switchery/switchery.min.js"></script>
<script src="/assets/plugins/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
<script>
    $(".cari").change(function() {
         $("#frm-cari").submit();
    });

	$(document).on('change', '[data-change="check-switchery-state-text"]', function() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        var id = $(this).data("id");
        var aksi = 'nonaktif';
        if ($(this).prop('checked'))
            aksi = 'aktif';
        $.ajax({
            url: "/periode/" + aksi + "/" + id,
            type: "PATCH",
            success: function(data){
                if(data == 1 || data == 0)
                    Toast.fire({ icon: 'success', title: 'Berhasil ' + (data == 1? 'mengaktifkan': 'menonaktifkan') + ' periode tahun ' + id });
                else
                    Swal.fire({ icon: 'error', title: 'Mengaktifkan/Menonaktifkan', text: data });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                Swal.fire({ icon: 'error', title: (data == 1? 'Mengaktifkan': 'Menonaktifkan') + ' Data', text: xhr.status });
            }
        });
	});

    if ($('[data-render=switchery]').length !== 0) {
		$('[data-render=switchery]').each(function() {
			var themeColor = COLOR_GREEN;
			if ($(this).attr('data-theme')) {
				switch ($(this).attr('data-theme')) {
					case 'red':
						themeColor = COLOR_RED;
						break;
					case 'blue':
						themeColor = COLOR_BLUE;
						break;
					case 'purple':
						themeColor = COLOR_PURPLE;
						break;
					case 'orange':
						themeColor = COLOR_ORANGE;
						break;
					case 'black':
						themeColor = COLOR_BLACK;
						break;
				}
			}
			var option = {};
			option.color = themeColor;
			option.secondaryColor = ($(this).attr('data-secondary-color')) ? $(this).attr('data-secondary-color') : '#dfdfdf';
			option.className = ($(this).attr('data-classname')) ? $(this).attr('data-classname') : 'switchery';
			option.disabled = ($(this).attr('data-disabled')) ? true : false;
			option.disabledOpacity = ($(this).attr('data-disabled-opacity')) ? parseFloat($(this).attr('data-disabled-opacity')) : 0.5;
			option.speed = ($(this).attr('data-speed')) ? $(this).attr('data-speed') : '0.5s';
			var switchery = new Switchery(this, option);
		});
	}

    function hapus(id) {
        Swal.fire({
            title: 'Hapus Data',
            text: 'Anda akan menghapus periode anggaran ' + id + '',
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
                    url: "/periode/hapus/" + id,
                    type: "POST",
                    data: {
                        "_method": 'DELETE'
                    },
                    success: function(data){
                        location.reload(true);
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        Toast.fire({
                            icon: 'error',
                            title: xhr.status
                        })
                    }
                });
            }
        });
    }
</script>
@endpush
