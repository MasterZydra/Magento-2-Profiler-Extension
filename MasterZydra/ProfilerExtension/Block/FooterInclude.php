<?php
/**
 * Copyright ©  All rights reserved.
 * See COPYING.txt for license details.
 */
declare(strict_types=1);

namespace MasterZydra\ProfilerExtension\Block;

class FooterInclude extends \Magento\Framework\View\Element\Template
{
    public function isProfilerEnabled() : bool
    {
        return !empty($_SERVER['MAGE_PROFILER']) || file_exists(BP . '/var/profiler.flag');
    }
}
