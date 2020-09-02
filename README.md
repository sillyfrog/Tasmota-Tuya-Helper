# Tasmota Tuya MCU Helper

I developed this to help me configure new Tuya devices running Tasmota.

I flash them using [Tuya-Convert](https://github.com/ct-Open-Source/tuya-convert), but often there is not a template available. It gets especially tricky when the device is run from an MCU, so you need to send commands and look at responses to try and configure the device and what DpId does what.

This helper adds a table to the Console screen that allows to to see what the current values are, what has changed, and make changes. For a quick demo see [this video](https://youtu.be/9bgwwWMb_Do).

## Installing

This is installed into your browser as a [Bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet).

The way to add this is to create a new bookmark, set the title to something like "Tuya Tasmota", and set the location to the contents of the "tuya-bookmarklet.js" file. This is a big long string on a single line. The best way to copy it is to open the file in GitHub, click on the "Raw" button, then press `Ctrl+A` then `Ctrl+C` (or on Mac `Command+A` then `Command+C`), that way you get the entire string that can be pasted into the location.

Once installed, you can then click on the new bookmarklet button when you have the Console page open on your new device.

Before using, ensure you set your device to be based on a Tuya MCU. This is done by going to _Configuration > Configure Template > Based On: Tuya MCU (54)_, and then click _save_. 

Once the Tuya Helper bookmarklet has completed gathering the Tuya DpID and FnID information, be sure to set the WebLog level back to the desired level (`WebLog 2` by default).

## Issues

So far, I have only provided support for Boolean and Integer/Number types (not String or Enum), as I didn't have a way to test, but it should be easy enough to add if someone is interested.

If you have any problems, please open an issue on GitHub and I'll try and help.

This is designed just for the initial setup of a device, not as an ongoing requirement.

Once you have configured your device, consider uploading the template to https://templates.blakadder.com/ - that way others can then use it in the future without having to go through the same configuration process.

Enjoy!
