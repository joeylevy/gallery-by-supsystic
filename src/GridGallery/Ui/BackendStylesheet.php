<?php

/**
 * Class GridGallery_Ui_BackendStylesheet
 *
 * Loads the stylesheet to backend.
 */
class GridGallery_Ui_BackendStylesheet extends GridGallery_Ui_Stylesheet
{
    /**
     * {@inheritdoc}
     */
    public function load()
    {
        $request = Rsc_Http_Request::create();

        if (false !== strpos($request->query->get('page'), 'supsystic-gallery')) {
            $this->register('admin_print_styles');
        }
    }
} 