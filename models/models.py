from openerp import models


def is_mail_thread(cls, cr, uid):
    return hasattr(cls, "message_mark_as_read")


models.BaseModel.is_mail_thread = classmethod(is_mail_thread)
