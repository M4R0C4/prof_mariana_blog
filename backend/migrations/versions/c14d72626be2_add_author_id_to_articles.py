"""add author_id to articles

Revision ID: c14d72626be2
Revises: 2be81ef633d1
Create Date: 2024-01-XX (sua data atual)

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'c14d72626be2'
down_revision = '2be81ef633d1'
branch_labels = None
depends_on = None

def upgrade():
    with op.batch_alter_table('articles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('author_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(
            'fk_articles_author_id',
            'users',
            ['author_id'],
            ['id']
        )

def downgrade():
    with op.batch_alter_table('articles', schema=None) as batch_op:
        batch_op.drop_constraint('fk_articles_author_id', type_='foreignkey')
        batch_op.drop_column('author_id')