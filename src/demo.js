import glanceSelector from "glance-selector";
import $ from 'jquery';
import randomColor from 'randomcolor';

window.glanceSelector = glanceSelector;

var activeHighlighted = $();

function clearHighlighted() {
    activeHighlighted.each(function() {
        $(this).css("background-color", $(this).data("original-background-color"))
    });
}

function highlightElements(elements) {
    clearHighlighted();

    activeHighlighted = $(elements)

    activeHighlighted.each(function() {
        $(this).data("original-background-color", $(this).css('backgroundColor'))
    }).css("background-color", randomColor({
        luminosity: "light"
    }))
}

glanceSelector.addExtension({
    beforeAll: function(selector){

        (function setDemoText(text) {
            if($("#glance-selector").length == 0) {
                setTimeout(function() { setDemoText(text) }, 250);
            }
            else {
                $("#glance-selector").val(text);
            }
        })(selector);
    },
    afterFilter: function(target, elements) {
        highlightElements(elements);
        return elements;
    }
});

$(function() {
    $("<div><input id='glance-selector'/></div>")
        .prependTo("body")
        .css({})
        .keyup(function() {
            var selector = $("#glance-selector").val();
            if (selector == "")
                clearHighlighted();
            else
                glanceSelector(selector)
        });
});