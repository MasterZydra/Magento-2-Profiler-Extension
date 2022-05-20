# Magento 2 Profiler-Extension
**Content**  
- [Features](#features)
  - [Color highlighting of indentation depth](#color-highlighting-of-indentation-depth)
  - [Filter](#filter)
- [How to use](#how-to-use)

The vision is a profiler similar to the [AOE Profiler for Magento 1](https://github.com/AOEpeople/Aoe_Profiler). The profiler extension shall use JS and CSS to add the styling and functionality based on the basic table returned by Magento 2.

The default profiler:
![](https://github.com/MasterZydra/Magento-2-Profiler-Extension/blob/main/doc/img/plainProfiler.jpeg)

The profiler with the extension:
![](https://github.com/MasterZydra/Magento-2-Profiler-Extension/blob/main/doc/img/extProfiler.jpeg)

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
