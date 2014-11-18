(function() {
  var delayTimer;
  return {
    requests: {
      searchGifs: function(q) {
        return {
          url: 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&imgtype=animated&q='+q,
          method: 'GET',
          dataType: 'json'
        };
      }
    },

    events: {
      // 'comment.text.changed': 'commentChanged',
      'input #search': 'searchInput',
      'click #image': 'selectImage'
    },
    // Wait a bit after the last input event, then search
    searchInput: function(event) {
      clearTimeout(delayTimer);
      var self = this;
      delayTimer = setTimeout(function() {
        self.search();
      }, 400);
    },

    search: function(event) {
      var q = this.$('#search').val();
      if(q) {
        var self = this;
        this.ajax('searchGifs', q)
            .done(function(data) {
              if(data.responseData.results) {
                self.showResults(data.responseData.results);
              }
              else {

              }

            });
      }
    },

    showResults: function(images) {
      this.switchTo('image', {
        imageAlt: images[0].contentNoFormatting,
        imageSrc: images[0].url
      });
    },

    selectImage: function(event) {
      var alt = event.currentTarget.alt;
      var src = event.currentTarget.currentSrc;
      var comment = this.comment();
      var commentUpdated = comment.text() + "!["+alt+"]("+src+")";
      comment.text(commentUpdated);
    },

    // commentChanged: function(data, comment) {
    //   // Try to find matching strings like ![gif search keywords]
    //   var gifs = /!\[gif ([^\]]+)\]/g.exec(comment);
    //   // If a gif was found
    //   if(gifs && gifs[1]) {
    //     var keywords = gifs[1];
    //     if(keywords == 'asd sdf') {
    //       var url = 'https://38.media.tumblr.com/092a9919260ac2a23d1480e13f095b89/tumblr_ndk1altiWI1r3kmkso3_400.gif';
    //       this.switchTo('image', {
    //           image: url
    //       });
    //     }
    //     else {
    //
    //     }
    //   }
    //
    // }


  };

}());
