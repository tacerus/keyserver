/* eslint-disable */

;(function($) {
  'use strict';

  $('.progress-bar').css('width', '100%');

  // GET key form
  $('#getKey form').submit(function(e) {
    e.preventDefault();
    $('#getKey .alert').addClass('hidden');
    $('#getKey .progress').removeClass('hidden');
    var query = encodeURIComponent($('#getKey input[type="text"]').val());
    var url = '/pks/lookup?op=get&search=' + query;
    console.log('query is: ' + query);
    $.ajax({
      method: 'GET',
      url: url
    }).done(function(data, textStatus, xhr) {
      console.log('status is: ' + xhr.status);
      if (xhr.status === 200) {
        alert('getKey', 'success', 'Found a result, redirecting ...');
	window.location=url;
      }
    })
    .fail(function(xhr) {
      alert('getKey', 'danger', JSON.parse(xhr.responseText).message);
    });
  });

  // POST key form
  $('#addKey form').submit(function(e) {
    e.preventDefault();
    $('#addKey .alert').addClass('hidden');
    $('#addKey .progress').removeClass('hidden');
    $.ajax({
      method: 'POST',
      url: '/api/v1/key',
      data: JSON.stringify({ publicKeyArmored:$('#addKey textarea').val() }),
      contentType: 'application/json',
    }).done(function(data, textStatus, xhr) {
      if (xhr.status === 304) {
        alert('addKey', 'danger', 'Key already exists!');
      } else {
        alert('addKey', 'success', xhr.responseText);
      }
    })
    .fail(function(xhr) {
      alert('addKey', 'danger', JSON.parse(xhr.responseText).message);
    });
  });

  // DELETE key form
  $('#removeKey form').submit(function(e) {
    e.preventDefault();
    $('#removeKey .alert').addClass('hidden');
    $('#removeKey .progress').removeClass('hidden');
    var email = $('#removeKey input[type="email"]').val();
    $.ajax({
      method: 'DELETE',
      url: '/api/v1/key?email=' + encodeURIComponent(email)
    }).done(function(data, textStatus, xhr) {
      alert('removeKey', 'success', xhr.responseText);
    })
    .fail(function(xhr) {
      alert('removeKey', 'danger', JSON.parse(xhr.responseText).message);
      console.log(xhr);
    });
  });

  function alert(region, outcome, text) {
    $('#' + region + ' .progress').addClass('hidden');
    $('#' + region + ' .alert-' + outcome + ' span').text(text);
    $('#' + region + ' .alert-' + outcome).removeClass('hidden');
  }

}(jQuery));
