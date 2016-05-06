import glanceSelector from "glance-selector";
import $ from 'jquery';

window.glanceSelector = glanceSelector;

var activeHighlighted = $();
var alreadySet = false;

function isDescendant(parent, child) {
    let node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};

function clearHighlighted() {
    activeHighlighted.each(function () {
        $(this).css("background-color", $(this).data("original-background-color"))
    });
}

function highlightElements(elements) {
    clearHighlighted();

    activeHighlighted = $(elements)

    activeHighlighted.each(function () {
        $(this).data("original-background-color", $(this).css('backgroundColor'))
    }).css("background-color", "#FACC0D");
}

glanceSelector.addExtension({
    beforeAll: function (selector) {
        (function setDemoText(text) {
            if ($("#glance-selector").length == 0) {
                setTimeout(function () {
                    setDemoText(text)
                }, 1);
            }
            else {
                if (!alreadySet) {
                    $("#glance-selector").val(text);
                    alreadySet = true
                }
            }
        })(selector);
    },
    afterFilter: function (elements, {scope}) {
        var nonDemoElements = elements.filter(function (e) {
            return !isDescendant($('#glance-demo')[0], e)
        });

        highlightElements(nonDemoElements);
        return nonDemoElements;
    }
});

$(function () {
    var toolbar = $("<div id='glance-demo'></div>")
        .prependTo("body")
        .css({
            "height": "40px",
            "margin-bottom": "10px"
        });

    var background = $("<div></div>")
        .prependTo(toolbar)
        .css({
            "position": "fixed",
            "height": "35px",
            "top": 0,
            "left": 0,
            "right": 0
        });

    $("<input id='glance-selector'/>")
        .prependTo(background)
        .css({
            "width": "100%",
            "font-size": "20px",
            "padding": "4px"
        })
        .keyup(function () {
            var selector = $("#glance-selector").val();
            if (selector == "")
                clearHighlighted();
            else
                glanceSelector(selector)
        });
});