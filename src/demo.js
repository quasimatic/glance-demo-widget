import glanceSelector from "glance-selector";
import $ from 'jquery';

$(function(){
    $("<div><input id='glance-selector'/></div>")
        .prependTo("body")
        .css({})
        .keyup(function() {
            var selector = $("#glance-selector").val();
            highlight(selector)
        });

    var activeHighlighted = $();

    function highlight(selector) {
        activeHighlighted.each(function() {
            console.log($(this).data("original-background-color"))
            $(this).css("background-color", $(this).data("original-background-color"))
        });

        activeHighlighted = $(glanceSelector(selector))

        activeHighlighted.each(function() {
            $(this).data("original-background-color", $(this).css('backgroundColor'))
        }).css("background-color", randomColor({
            luminosity: "light"
        }))
    }
})