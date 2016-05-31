$(document).ready(function() {

// remote
// ------

  var autocomplete = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    limit: 5,
    remote: 'http://localhost:8888/MedymologyRestServices/autocomplete.php',
    rateLimitWait: 100
  });

  autocomplete.initialize();

  $('.typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 2
  },
  {
    name: 'autocomplete',
    displayKey: 'value',
    source: autocomplete.ttAdapter()
  });

  $(document).on("typeahead:selected", function(e, datum_returned, dataset_name) {
    console.log("Something has been selected");
    console.log(datum_returned);
    console.log(dataset_name);
    $("#searchForm").submit();
  });

});

$(document).ready(function(){
    $(".searchinput").keyup(function(){
        $(".searchclear").toggle(Boolean($(this).val()));
    });
    $(".searchclear").toggle(Boolean($(".searchinput").val()));
    $(".searchclear").click(function(){
        $(".searchinput").val('').focus();
        $(this).hide();
    });
});