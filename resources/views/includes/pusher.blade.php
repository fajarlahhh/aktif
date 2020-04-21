
<script src="/assets/plugins/jquery-sparkline/jquery.sparkline.min.js"></script>
<script src="https://js.pusher.com/5.0/pusher.min.js"></script>
<script>
    Pusher.logToConsole = true;

    var pusher = new Pusher('79381d27b549dd4e47d9', {
        cluster: 'ap1',
        forceTLS: true
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
        if(data.session != "{{ Session::getId() }}" && data.user == "{{ Auth::id() }}") {
            $.gritter.add({
                title: 'Logged Out',
                text: 'Akun anda sudah melakukan login di device lainnya',
                sticky: true,
                time: 3000,
                class_name: 'my-sticky-class'
            });
            setTimeout(function() {
                window.location = '/logout';
            }, 3000);
        }
    });
</script>
