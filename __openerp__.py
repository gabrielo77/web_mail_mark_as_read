{
    'name': 'WEB: Mark all as read',
    'category': 'Web',
    'version': '8.0.1.0.1',
    'description':
        """
        """,
    'depends': ['web'],
    'auto_install': False,
    'data': [
        'views/web_mail_mark_as_read_template.xml',
    ],
    'qweb': [
    ],
    'bootstrap': True,  # load translations for login screen
}
