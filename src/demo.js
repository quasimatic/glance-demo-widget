import glanceSelector from "glance-selector";
import $ from 'jquery';

window.glanceSelector = glanceSelector;

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
    $('*[data-original-background-color]').each(function () {
        $(this).css("background-color", $(this).data("original-background-color"))
        $(this).removeAttr("data-original-background-color")
    });
}

function highlightElements(elements) {
    $(elements).each(function () {
        $(this).attr("data-original-background-color", $(this).css('backgroundColor'))
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

    beforeScope: function () {
        clearHighlighted();
    },

    afterFilter: function (elements, {scope}) {
        var nonDemoElements = elements.filter(function (e) {
            return !isDescendant($('#glance-demo')[0], e)
        });

        return nonDemoElements;
    },

    afterPositional: function (elements) {
        highlightElements(elements);
        return elements;
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
        .appendTo(toolbar)
        .css({
            "position": "fixed",
            "height": "23px",
            "top": 0,
            "left": 0,
            "right": 0,
            "background-color": "#3D5980",
            "padding": "4px"
        });

    var label = $("<label>Glance:&nbsp;</label>")
        .appendTo(background)
        .css({
            "color": "white",
            "float": "left",
            "font-size": "20px",
            "line-height": "24px"
        });

    var wrapper = $("<span></span>")
        .appendTo(background)
        .css({
            "display": "block",
            "overflow": "hidden"
        });

    $("<input id='glance-selector'/>")
        .appendTo(wrapper)
        .css({
            "font-size": "20px",
            "padding": "0px 0px 0px 4px",
            "width": "100%",
            "outline-width": 0,
            "border": 0
        })
        .keyup(function () {
            var selector = $("#glance-selector").val();
            if (selector == "")
                clearHighlighted();
            else
                glanceSelector(selector);
        });
});