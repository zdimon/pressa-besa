# Generated by Django 3.1.7 on 2021-04-02 15:26

from django.db import migrations
import image_cropping.fields


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20210402_1013'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='cropping',
            field=image_cropping.fields.ImageRatioField('image', '80x80', adapt_rotation=False, allow_fullsize=False, free_crop=False, help_text=None, hide_image_field=False, size_warning=False, verbose_name='cropping'),
        ),
        migrations.AlterField(
            model_name='file',
            name='image',
            field=image_cropping.fields.ImageCropField(upload_to='files'),
        ),
    ]