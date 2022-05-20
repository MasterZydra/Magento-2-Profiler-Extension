# Magento-2-Profiler-Extension
**Content**  
- [Features](#features)
  - [Color highlighting of indentation depth](#color-highlighting-of-indentation-depth)
  - [Filter](#filter)
- [How to use](#how-to-use)

JS to extend the styling and functionality of the default Magento 2 profiler

The default profiler:
![](https://github.com/MasterZydra/Magento-2-Profiler-Extension/blob/main/doc/img/plainProfiler.jpeg)

## Features
### Color highlighting of indentation depth
The extended profiler uses colors to better visualize the indentation depth.
By clicking on a line, the subordinate entries are shown or hidden.

![](https://github.com/MasterZydra/Magento-2-Profiler-Extension/blob/main/doc/img/extProfiler_color.jpeg)

### Filter
Another feature are filters to limit the view to only relevant entries.
A minimum time is supported as a filter. All entries which are below the given time will be hidden.

![](https://github.com/MasterZydra/Magento-2-Profiler-Extension/blob/main/doc/img/extProfiler.jpeg)

## How to use
Add the `profiler.less` and `profilerExt.js` to your Magento instance.  
If the profiler is activated, call the function `extendCodeProfiler()`.
