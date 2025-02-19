# Magento 2 Profiler-Extension
**Content**  
- [Installation](#installation)
- [Updating to latest version](#updating-to-latest-version)
- [How it works](#how-it-works)
- [Features](#features)
  - [Color highlighting of indentation depth](#color-highlighting-of-indentation-depth)
  - [Collapsing subordinate entries](#collapsing-subordinate-entries)
  - [Filter](#filter)

The vision is a profiler similar to the [AOE Profiler for Magento 1](https://github.com/AOEpeople/Aoe_Profiler). The profiler extension shall use JS and CSS to add the styling and functionality based on the basic table returned by Magento 2.

The default profiler:  
<img src="https://github.com/MasterZydra/Magento-2-Profiler-Extension/blob/main/doc/img/plainProfiler.jpeg" width="700">

The profiler with the extension:  
<img src="https://github.com/MasterZydra/Magento-2-Profiler-Extension/blob/main/doc/img/extProfiler.jpeg" width="700">

[Package on Packagist.org](https://packagist.org/packages/masterzydra/module-profilerextension)

## Installation
This Magento2 module can be installed using composer:  
`> composer require masterzydra/module-profilerextension`

To remove it from the list of required packages use the following command:  
`> composer remove masterzydra/module-profilerextension`

## Updating to latest version
With the following command composer checks all packages in the composer.json for the latest version:  
`> composer update`

If you only want to check this package for newer versions, you can use  
`> composer update masterzydra/module-profilerextension`

## How it works
After installing the package via composer, the module calls a JavaScript function in the footer. This function will detect the profiler table, adds the filters and adds the classes for the CSS.

**Enable the profiler**  
`> bin/magento dev:profiler:enable`

**Disable the profiler**  
`> bin/magento dev:profiler:disable`

## Features
### Color highlighting of indentation depth
The extended profiler uses colors to better visualize the indentation depth.

<img src="https://github.com/MasterZydra/Magento-2-Profiler-Extension/blob/main/doc/img/extProfiler_color.jpeg" width="700">

### Collapsing subordinate entries
By clicking on a line, the subordinate entries are shown or hidden.

<img src="https://github.com/MasterZydra/Magento-2-Profiler-Extension/blob/main/doc/img/extProfiler_collapsed.jpg" width="700">

### Filter
Another feature are filters to limit the view to only relevant entries.
You can filter for a timer id that contains a given text or for timers with a given minimum time.
If you add multiple filters all filters must match.

<img src="https://github.com/MasterZydra/Magento-2-Profiler-Extension/blob/main/doc/img/extProfiler.jpeg" width="700">
