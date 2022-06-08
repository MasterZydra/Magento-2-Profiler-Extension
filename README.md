# Magento 2 Profiler-Extension
**Content**  
- [Installation](#installation)
- [How it works](#how-it-works)
- [Features](#features)
  - [Color highlighting of indentation depth](#color-highlighting-of-indentation-depth)
  - [Filter](#filter)

The vision is a profiler similar to the [AOE Profiler for Magento 1](https://github.com/AOEpeople/Aoe_Profiler). The profiler extension shall use JS and CSS to add the styling and functionality based on the basic table returned by Magento 2.

The default profiler:
![](/doc/img/plainProfiler.jpeg)

The profiler with the extension:
![](/doc/img/extProfiler.jpeg)

## Installation
This Magento2 module can be installed using composer:  
`> composer require masterzydra/module-profilerextension`

To remove it from the list of required packages use the following command:  
`> composer remove masterzydra/module-profilerextension`

## How it works
After installing the package via composer, the module calls a JavaScript function in the footer. This function will detect the profiler table, adds the filters and adds the classes for the CSS.

**Enable the profiler**  
`> bin/magento dev:profiler:enable`

**Disable the profiler**  
`> bin/magento dev:profiler:disable`

## Features
### Color highlighting of indentation depth
The extended profiler uses colors to better visualize the indentation depth.
By clicking on a line, the subordinate entries are shown or hidden.

![](/doc/img/extProfiler_color.jpeg)

### Filter
Another feature are filters to limit the view to only relevant entries.
A minimum time is supported as a filter. All entries which are below the given time will be hidden.

![](/doc/img/extProfiler.jpeg)
