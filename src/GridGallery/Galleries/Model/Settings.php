<?php

/**
 * Class GridGallery_Galleries_Model_Settings
 *
 * @package GridGallery\Galleries\Model
 * @author Artur Kovalevsky
 */
class GridGallery_Galleries_Model_Settings extends GridGallery_Core_BaseModel
{

    /**
     * @var string
     */
    protected $table;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();

        $this->table = $this->db->prefix . 'gg_settings_sets';
    }

    /**
     * Saves the settings to the database.
     *
     * @param int $id Gallery Id.
     * @param mixed $data The settings.
     */
    public function save($id, $data)
    {
        if (null === $this->get($id)) {
            return $this->insert($id, $data);
        }

        return $this->update($id, $data);
    }

    public function getCatsFromPreset($data, $config) {
        $config->load('@galleries/categories_presets.php');
        $presets = $config->get('categories_presets');
        $preset_number = $data['categories']['preset'];
        $customPresets = get_option('customCatsPresets');

        if(!$presets[$preset_number] && !empty($customPresets) && $customPresets[$preset_number - sizeof($presets)]['categories']) {
            $data['categories'] = array_merge($data['categories'], $customPresets[$preset_number - sizeof($presets)]['categories']);
        } else {
            if(is_array($presets[$preset_number]) && !empty($presets[$preset_number])) {
                $data['categories'] = array_merge($data['categories'], $presets[$preset_number]);
            }
        }

        return $data;
    }

    public function getPagesFromPreset($data, $config) {
        $config->load('@galleries/pagination_presets.php');
        $presets = $config->get('pagination_presets');
        $preset_number = $data['pagination']['preset'];
        $customPresets = get_option('customPagesPresets');

        if(!$presets[$preset_number] && !empty($customPresets) && $customPresets[$preset_number - sizeof($presets)]['pagination']) {
            $data['pagination'] = array_merge($data['pagination'], $customPresets[$preset_number - sizeof($presets)]['pagination']);
        } else {
            if(is_array($presets[$preset_number]) && !empty($presets[$preset_number])) {
                $data['pagination'] = array_merge($data['pagination'], $presets[$preset_number]);
            }
        }

        return $data;
    }

    public function settingsDiff($stats, $id, $data) {
        foreach($this->get($id)->data as $key => $value) {
            if(is_array($data[$key])) {
                if(is_array($value) && !empty($value)) {
                    $diffOptions = array_diff_assoc($data[$key], $value);
                    $this->saveDiffOptions($stats, $key, $diffOptions);
                    foreach($value as $el => $opt) {
                        if(is_array($opt)) {
                            $diffOptions = array_diff_assoc($data[$key][$el], $opt);
                            $this->saveDiffOptions($stats, $key, $diffOptions);
                        }
                    }
                }
            }
        }
    }

    public function saveDiffOptions($stats, $element, $diffOptions) {
        if(sizeof($diffOptions) > 0)
            foreach($diffOptions as $key => $value)
                $stats->save('settings.' . $element . '.' . $key);
    }

    public function isMobile($checkMobile) {
        require_once 'plugins/Mobile_Detect.php';

        $detect = new Mobile_Detect;

        if($detect->isMobile() && $checkMobile == 'on'){
            return true;
        }

        return false;
    }

    /**
     * Returns the settings for the gallery by id.
     *
     * @param int $id Gallery Id.
     * @return stdClass
     */
    public function get($id)
    {
        return $this->getBy('gallery_id', (int)$id);
    }


    public function getByGalleryId($galleryId)
    {
        return $this->get($galleryId);
    }

    public function getById($id)
    {
        return $this->getBy('id', (int)$id);
    }

    /**
     * Saves the data to the database.
     * @param int $id Gallery Id.
     * @param array $data
     * @return bool|int
     */
    protected function insert($id, $data)
    {
        $fields = array(
            'gallery_id' => $id,
            'data' => serialize($data)
        );

        $query = $this->getQueryBuilder()->insertInto($this->table)
            ->fields(array_keys($fields))
            ->values(array_values($fields));

        if (false !== $this->db->query($query->build())) {
            return true;
        }

        return false;
    }

    /**
     * Updates the settings.
     * @param int $id
     * @param array $data
     * @return bool
     */
    protected function update($id, $data)
    {
        $query = $this->getQueryBuilder()->update($this->table)
            ->where('gallery_id', '=', (int)$id)
            ->fields('data')
            ->values(serialize($data));

        if (false !== $this->db->query($query->build())) {
            return true;
        }

        return false;
    }

    protected function getBy($field, $value)
    {
        $query = $this->getQueryBuilder()->select('*')
            ->from($this->table)
            ->where($field, '=', $value);

        if (null !== $row = $this->db->get_row($query->build())) {
            if (isset($row->data)) {
                $row->data = unserialize($row->data);
            }
        }

        return $row;
    }

    public function postThumb($galleries) {
        if($galleries) {
            foreach($galleries as $gallery) {
                if ($gallery->settings['posts'] && $gallery->settings['posts']['enable'] == '1') {
                    $postCover = wp_get_attachment_url(get_post_thumbnail_id($gallery->settings['posts']['current']));
                    if (!$postCover) {
                        $postCover = wp_get_attachment_url(get_post_thumbnail_id($gallery->settings['pages']['current']));
                    }
                    $gallery->settings['posts']['postCover'] = $postCover;
                    $gallery->settings['posts']['length'] = 0;
                    $posts = get_option('post_to_render' . $gallery->id);
                    $pages = get_option('pages_to_render' . $gallery->id);
                    if($posts) {
                        $gallery->settings['posts']['length'] += count($posts);
                    }
                    if($pages) {
                        $gallery->settings['posts']['length'] += count($pages);
                    }
                }
            }
        }
    }

    public function getPostsToRender($gallery_id) {
        $posts = array();
        if(get_option('post_to_render' . $gallery_id)) {
            foreach(get_option('post_to_render' . $gallery_id) as $id) {
                $row = array();
                $post = get_post($id);
                $row['author'] = get_user_by('id', $post->post_author)->user_login;
                $row['authorUrl'] = get_author_posts_url( get_the_author_meta( $post->post_author ), $row['author'] );
                $row['title'] = $post->post_title;
                $row['content'] = strip_tags($post->post_content);
                $row['date'] = get_post_time('M j, Y', false, $id, true);
                $row['dateUrl'] = get_day_link(mysql2date("Y", $post->post_date_gmt), mysql2date("m", $post->post_date_gmt), mysql2date("d", $post->post_date_gmt));
                $row['categories'] = $this->getCategories($id);
                $row['url'] = get_permalink($id);
                $row['photo'] = wp_get_attachment_url(get_post_thumbnail_id($id));
                $row['photoId'] = get_post_thumbnail_id($id);
                $posts[] = $row;
            }
        }
        return $posts;
    }

    public function getPagesToRender($gallery_id) {
        $pages = array();
        if(get_option('pages_to_render' . $gallery_id)) {
            foreach(get_option('pages_to_render' . $gallery_id) as $id) {
                $row = array();
                $page = get_post($id);
                $row['author'] = get_user_by('id', $page->post_author)->user_login;
                $row['authorUrl'] = get_author_posts_url( get_the_author_meta( $page->post_author ), $row['author']);
                $row['title'] = $page->post_title;
                $row['content'] = strip_tags($page->post_content);
                $row['date'] = get_post_time('M j, Y', false, $id, true);
                $row['dateUrl'] = get_day_link(mysql2date("Y", $page->post_date_gmt), mysql2date("m", $page->post_date_gmt), mysql2date("d", $page->post_date_gmt));
                $row['categories'] = $this->getCategories($id);
                $row['url'] = get_permalink($id);
                $row['photo'] = wp_get_attachment_url(get_post_thumbnail_id($id));
                $row['photoId'] = get_post_thumbnail_id($id);
                $pages[] = $row;
            }
        }
        return $pages;
    }

    public function getCategories($id) {
        $categories = array();
        foreach(wp_get_post_categories($id) as $category_id) {
            $row = array();
            $row['name'] = get_the_category_by_ID($category_id);
            $row['url'] = get_category_link($category_id);
            array_push($categories, $row);
        }
        return $categories;
    }
}
