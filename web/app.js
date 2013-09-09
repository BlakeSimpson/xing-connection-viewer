$(function() {
   // begin app on DOM load
  App.init();

  $( window ).resize( function() {
    $( ".profile:not(.me)" ).remove();
    App.circle();
  } );
});

App = (function() {
  return {
    userID: "16184731_41d6ee",
    data: {},
    shares: [],

    init: function () {
      $.getJSON(
        "../data/shares_" + this.userID + ".json",
        $.proxy( this.applyData, this )
      );
    },

    applyData: function ( json ) {
      this.data = json;

      var $me = this._addContact( {
        name: this.data.me.display_name,
        image: this.data.me.photo_urls.large
      }, "me active" );

      this._collectShares();
    },

    circle: function () {
      var total = this.shares.length,
        distance = 10 * total,
        circle = Math.PI,
        angleSegments = 2 / total,
        angle = 0,
        $me, offset, centerLeft, centerTop;

      $me = $( ".profile.me" );
      offset = $me.offset();
      centerLeft = offset.left + ( $me.width() / 2 );
      centerTop = offset.top + ( $me.height() / 2 );

      for ( var i = 0; i < total; i++ ) {
        var share = this.shares[ i ],
          $profile = this._addContact( share, "contact" ),
          left = ~~( Math.sin( angle * circle ) * distance ),
          top = ~~( Math.cos( angle * circle ) * distance );

        $profile.css( "left", ( centerLeft + left ) );
        $profile.css( "top", ( centerTop + top ) );
        angle += angleSegments;
      }
    },

    _collectShares: function () {
      for ( var id in this.data.shares ) {
        var sharedIDs = this.data.shares[ id ],
          profile = this._getProfile( id ),
          result;

        result = {
          name: profile.display_name,
          shares: sharedIDs,
          image: profile.photo_urls.medium_thumb
        };

        this.shares.push( result );
      }

      this.shares = this.shares.sort( function( a, b ) {
        return a.shares.lenth > b.shares.length ? +1 : -1;
      } );

      this.circle();
    },

    _addContact: function ( profile, styles ) {
      var $node = $( "<div class='profile'></div>" ).addClass( styles ),
        $img = $( "<img>" ).attr( "src", profile.image ).attr( "alt", profile.name );

      $node.html( $img );
      $( "body" ).append( $node );
      return $node;
    },

    _getProfile: function ( id ) {
      return this.data.profiles[ id ];
    }
  };
})();