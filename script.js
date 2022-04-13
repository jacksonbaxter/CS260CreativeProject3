var app = new Vue({
    el: '#app',
    data: {
        response: "",
        playlist: [],
        loading: false,
        prefix: "",
        listName: '',
        message: '',
        time: '',
    },
    methods: {
        async getREST() {
            try {
                console.log("In Fetch " + this.prefix);
                var url = "https://itunes.apple.com/search?term=" + this.prefix + "&country=US&media=music&limit=20";
                console.log("URL: " + url);

                this.loading = true;
                let object = await axios.get(url);
                this.response = object.data;
                console.log(this.response);
                this.loading = false;
            } catch (error) {
                console.log(error);
            }
        },
        addSong(song) {
            if (this.playlist.indexOf(song) == -1 && song.kind == "song") {
                this.playlist.push(song);
                console.log(this.playlist);
            }
        },


        /*Right Side*/
        addPlaylist() {
            this.listName = this.message;
            console.log(this.listName);
            this.message = '';

        },
        dragItem(item) {
            this.drag = item;
        },
        dropItem(item) {
            const indexItem = this.todos.indexOf(this.drag);
            const indexTarget = this.todos.indexOf(item);
            this.todos.splice(indexItem, 1);
            this.todos.splice(indexTarget, 0, this.drag);
        },
        deleteItem(item) {
            var index = this.playlist.indexOf(item);
            if (index > -1)
                this.playlist.splice(index, 1);
        },
        millisToMinutesAndSeconds(item) {
            var millis = item.trackTimeMillis;
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            this.time = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            console.log(minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

        },
        playSound(item) {
            var url = item.previewUrl;
            var a = new Audio(url);
            a.play();
        }

    },
});